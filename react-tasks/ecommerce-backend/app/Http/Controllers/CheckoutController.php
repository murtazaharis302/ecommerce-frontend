<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmation;
use App\Models\Order;
use App\Models\OrderItem;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        $items = $request->items;
        $total = 0;
        
        foreach ($items as $item) {
            $total += ($item['price'] ?? 0) * ($item['quantity'] ?? 1);
        }

        // Stripe expects amount in cents
        $amountInCents = $total * 100;

        try {
            \Stripe\Stripe::setApiKey(config('services.stripe.secret'));

            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $amountInCents,
                'currency' => 'pkr',
                'payment_method_types' => ['card'],
                'metadata' => [
                    'user_email' => $request->user()->email,
                    'items_count' => count($items),
                ],
            ]);

            // Log order attempt
            \Log::build([
                'driver' => 'single',
                'path' => storage_path('logs/orders.log'),
            ])->info("PAYMENT INTENT CREATED: " . $request->user()->email . " | Total: $" . number_format($total, 2) . " | Intent ID: " . $paymentIntent->id);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret,
                'message' => 'Payment intent created successfully',
            ]);

        } catch (\Exception $e) {
            \Log::error('Stripe PaymentIntent failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Payment initialization failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function paymentSuccess(Request $request)
    {
        $items = $request->items;
        $total = $request->total;
        $user = $request->user();
        
        // Log final success
        \Log::build([
            'driver' => 'single',
            'path' => storage_path('logs/orders.log'),
        ])->info("PAYMENT SUCCESSFUL: " . $user->email . " | Total: $" . number_format($total, 2));

        // Save Order to Database
        try {
            $order = Order::create([
                'user_id' => $user->id,
                'total' => $total,
                'status' => 'completed',
            ]);

            foreach ($items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'] ?? 1,
                    'price' => $item['price'],
                ]);
            }
        } catch (\Exception $e) {
            \Log::error('Failed to save order to database: ' . $e->getMessage());
        }

        // Send order confirmation email
        try {
            Mail::to($user->email)->send(new OrderConfirmation($items, $total));
        } catch (\Exception $e) {
            \Log::error('Order confirmation mail failed after payment: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Order completed, saved to database, and confirmation email sent'
        ]);
    }
}
