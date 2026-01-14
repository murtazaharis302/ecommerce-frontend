<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Order Confirmation - ShipHub</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #0f0c29;
            margin: 0;
            padding: 0;
            color: #ffffff;
        }
        .wrapper {
            background-color: #0f0c29;
            padding: 40px 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 22, 40, 0.95) 100%);
            padding: 40px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .logo {
            font-size: 32px;
            font-weight: 800;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: #667eea;
            margin-bottom: 10px;
            display: inline-block;
        }
        .header h1 {
            color: #ffffff;
            font-size: 28px;
            margin: 10px 0;
        }
        .header p {
            color: rgba(255, 255, 255, 0.6);
            font-size: 16px;
        }
        .order-summary {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
        }
        .order-summary th {
            text-align: left;
            padding: 15px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.5);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .order-summary td {
            padding: 15px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            color: #ffffff;
            font-size: 15px;
        }
        .total-row td {
            font-weight: 800;
            font-size: 20px;
            color: #4facfe;
            border-top: 2px solid rgba(255, 255, 255, 0.1);
            padding-top: 20px;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.4);
            margin-top: 40px;
        }
        .btn {
            display: inline-block;
            padding: 14px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 700;
            margin-top: 20px;
            text-align: center;
        }
        .highlight {
            color: #f093fb;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <div class="logo">✨ ShipHub</div>
                <h1>Order Confirmed! 🎉</h1>
                <p>Jani, aapka order receive ho gaya hai! Checkout complete karne ka shukriya.</p>
            </div>

            <p style="font-size: 16px;">Hi Customer,</p>
            <p style="color: rgba(255, 255, 255, 0.8);">Thank you for choosing <span class="highlight">ShipHub</span>. We are currently processing your items and will notify you once they're shipped.</p>

            <table class="order-summary">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th style="text-align: right;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($items as $item)
                    <tr>
                        <td>{{ $item['name'] ?? $item['title'] ?? 'Product' }}</td>
                        <td>{{ $item['quantity'] ?? 1 }}</td>
                        <td style="text-align: right;">Rs {{ number_format(($item['price'] ?? 0), 0) }}</td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr class="total-row">
                        <td colspan="2" style="text-align: right;">Total Bill:</td>
                        <td style="text-align: right; color: #00f2fe;">Rs {{ number_format($total, 0) }}</td>
                    </tr>
                </tfoot>
            </table>

            <div style="text-align: center; margin-top: 40px;">
                <p style="margin-bottom: 20px;">You can track your order status in your profile dashboard.</p>
                <a href="http://localhost:5173/profile" class="btn">View My Orders</a>
            </div>

            <div class="footer">
                <p>Thank you for shopping at <strong>ShipHub</strong>!</p>
                <p>&copy; {{ date('Y') }} ShipHub. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>
