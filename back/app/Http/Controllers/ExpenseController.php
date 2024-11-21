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

        $expense = Expense::create([
            'user_id' => auth()->id(),
            'amount' => $validated['amount'],
            'category' => $validated['category'],
            'date' => $validated['date'],
            'description' => $validated['description'],
        ]);

        return response()->json([
            'message' => 'Expense created successfully',
            'expense' => $expense,
        ], 201);
    }

    public function getExpenses(): JsonResponse
    {
        $expenses = auth()->user()->expenses()->latest()->get();
        return response()->json($expenses);
    }

}
