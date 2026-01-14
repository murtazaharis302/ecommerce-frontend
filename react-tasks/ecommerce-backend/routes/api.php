
<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;

// Auth routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function(){
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('checkout', [CheckoutController::class, 'checkout']);
    Route::post('payment-success', [CheckoutController::class, 'paymentSuccess']);
    Route::put('user/profile', [AuthController::class, 'updateProfile']);
    Route::get('user/orders', [OrderController::class, 'index']);
});

// Public products routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);


