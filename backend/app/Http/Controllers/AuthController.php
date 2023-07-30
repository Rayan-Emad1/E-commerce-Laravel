<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Customer;

class AuthController extends Controller
{
    public function signin(Request $request)
    {
        $email = $request->input('email');

        // Check if the email exists in the admins table
        $admin = Admin::where('email', $email)->first();

        if ($admin) {
            // User is an admin
            return response()->json(['role' => 'admin', 'user' => $admin], 200);
        }

        // If email is not found in admins table, check customers table
        $customer = Customer::where('email', $email)->first();

        if ($customer) {
            // User is a customer
            return response()->json(['role' => 'customer', 'user' => $customer], 200);
        }

        // Email not found in both admins and customers table, user needs to register
        return response()->json(['message' => 'User not registered'], 401);
    }
}