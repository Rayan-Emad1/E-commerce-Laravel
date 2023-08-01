<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Admin;

class AdminController extends Controller
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


    public function create(Request $request){

        if (!$request->has(['title', 'description', 'category_name'])) {
            return response()->json(['error' => 'Missing required fields']);
        }

        $categoryName = $request->category_name;
        $category = Category::where('category', $categoryName)->first();

        if (!$category) {
            $category = new Category();
            $category->category = $categoryName;
            $category->save();
            return response()->json(["Please try again"]);
        }

        $product = new Product();
        $product->title = $request->title;
        $product->description = $request->description;
        $product->id_category = $category->id_category;
        $product->save();

        return response()->json([
            'message' => 'Product created successfully',
            'category' => $category,
            'product' => $product,
        ]);
    }

  public function update(Request $request)
    {
        $productId = $request->id ;

        $product = Product::find($productId);
        if (!$product) {
            return response()->json(['error' => 'Product not found']);
        }
        // dd($product);

        $product->title = $request->title ? $request->title : $product->title;
        $product->description = $request->description ? $request->description : $product->description;
        
        if ($request->has('category_name')) {
            $categoryName = $request->category_name;
            $category = Category::where('category', $categoryName)->first();
            if (!$category) {
                $category = new Category();
                $category->category = $categoryName;
                $category->save();
                return response()->json(["Please try again"]);
            }
            $product->id_category = $category->id_category;
        }

        $product->update(); 

        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }

    public function destroy(Request $request)
    {
        $productId = $request->id;

        $product = Product::find($productId);
        // $article = Article::find($id)->delete();
        // dd($product);

        if (!$product) {
            return response()->json(['error' => 'Product not found']);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }



}
