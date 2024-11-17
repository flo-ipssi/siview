<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function store(Request $request): JsonResponse 
    {
        $validated = $request->validate([
            'amount' => 'required|numeric',
            'category' => 'required|string',
            'date' => 'required|date',
            'description' => 'nullable|string',
        ]);

        $expense = Expense::create($validated);

        return response()->json($expense, 201);
    }

    // public function stats(Request $request): JsonResponse
    // {

    // }

}
