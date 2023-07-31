<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Category;
use App\Models\Like;
use App\Models\Cart;

class CustomerController extends Controller
{
    public function getProducts(){
        $products = Product::all();
        $response = [];

        foreach ($products as $product) {
            $id = $product->id_category;
            $category = Category::where("id_category", $id)->first();

            $productInfo = [
                'id' => $product->id,
                'title' => $product->title,
                'description' => $product->description,
                // 'product_image' => $product->product_image,
                'category_name' => $category ? $category->category : null,
            ];

            $response[] = $productInfo;
        }

        return response()->json(['products' => $response]);
    }

    public function getProduct(Request $request){
        $categoryTitle = $request->category ?? '';
        $title = $request->title ?? '';
    
        $query = Product::query();
    
        if ($categoryTitle) {
            $category = Category::where("category", "LIKE", "%$categoryTitle%")->first();
            // dd($categoryTitle, $category);
            if ($category) {
                $query->where('id_category', $category->id_category);
                // dd($query->toSql(), $query->getBindings());
            }else {
                return response()->json(['products' => []]);
            }
             
        }
    
        if ($title) {
            $query->where(function ($q) use ($title) {
                $q->where('title', 'LIKE', "%$title%")
                  ->orWhere('description', 'LIKE', "%$title%");
            });
        }
    
        $products = $query->get();
        //Read the SQL
        // dd($query->toSql(), $query->getBindings());
        $response = [];

        foreach ($products as $product) {
            $category = Category::where("id_category", $product->id_category)->first();
    
            $productInfo = [
                'id' => $product->id_product,
                'title' => $product->title,
                'description' => $product->description,
                // 'product_image' => $product->product_image,
                'category_name' => $category ? $category->category : null,
            ];
    
            $response[] = $productInfo;
        }
        return response()->json(['products' => $response]);
    }
    
    public function addToCart(Request $request){
        $productId = $request->product_id ?? 1;
        $customerId = $request->customer_id ?? 1;

        $product = Product::find($productId);
        // $product = Product::where('id_product', $productId)->first();
        $customer = Customer::where('id_customer', $customerId)->first();
        // dd('Product ID:', $product);

        if (!$product || !$customer) {
            return response()->json(['error' => 'Product or Customer not found']);
        }

        // Add the product to the cart
        $cart = new Cart();
        $cart->id_user = $customerId;
        $cart->id_product = $productId;
        $cart->save();

        return response()->json(['message' => 'Product added to cart successfully']);
    }

    public function addToLiked(Request $request){
        $productId = $request->input('product_id');
        $customerId = $request->input('customer_id');

        $product = Product::find($productId);
        // $product = Product::where('id_product', $productId)->first();
        $customer = Customer::where('id_customer', $customerId)->first();

        if (!$productId || !$customerId) {
            return response()->json(['error' => 'Product or Customer not found']);
        }

        // Add the product to the liked table
        $like = new Like();
        $like->id_user = $customerId;
        $like->id_product = $productId;
        $like->save();

        return response()->json(['message' => 'Product added to liked table successfully']);
    }
  
    public function getCustomerProducts(Request $request){

        $customerId = $request->customer_id ?? 1;

        $cartProducts = Cart::where('id_user', $customerId)->get();
        $likedProducts = Like::where('id_user', $customerId)->get();

        $cartList = [];
        foreach ($cartProducts as $cartProduct) {
            $product = Product::where('id', $cartProduct->id_product)->first();
            if ($product) {
                $category = Category::where('id_category', $product->id_category)->first();

                $cartList[] = [
                    'id' => $product->id,
                    'title' => $product->title,
                    'description' => $product->description,
                    'category_name' => $category ? $category->category : null,
                ];
            }
        }

        $likedList = [];
        foreach ($likedProducts as $likedProduct) {
            $product = Product::where('id', $likedProduct->id_product)->first();
            if ($product) {
                $category = Category::where('id_category', $product->id_category)->first();

                $likedList[] = [
                    'id' => $product->id,
                    'title' => $product->title,
                    'description' => $product->description,
                    'category_name' => $category ? $category->category : null,
                ];
            }
        }

        return response()->json([
            'cart_list' => $cartList,
            'liked_list' => $likedList,
        ]);
    }

}
