<?php

namespace App\Http\Controllers;

use App\Models\Empreendimento;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EmpreendimentoController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Empreendimento::query();

        if ($request->filled('busca')) {
            $query->where('nome', 'like', '%' . $request->busca . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $empreendimentos = $query->orderBy('id', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $empreendimentos,
        ]);
    }

    public function show($id): JsonResponse
    {
        $empreendimento = Empreendimento::find($id);

        if (!$empreendimento) {
            return response()->json([
                'success' => false,
                'message' => 'Empreendimento não encontrado',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $empreendimento,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'cidade' => 'required|string|max:255',
            'estado' => 'required|string|size:2',
            'valor_total' => 'required|numeric|gt:0',
            'quantidade_unidades' => 'required|integer|gt:0',
            'valor_unidade' => 'required|numeric|gt:0',
            'status' => 'required|string|in:em_lancamento,em_obras,entregue',
        ]);

        $empreendimento = Empreendimento::create($validated);

        return response()->json([
            'success' => true,
            'data' => $empreendimento,
            'message' => 'Empreendimento criado com sucesso',
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $empreendimento = Empreendimento::find($id);

        if (!$empreendimento) {
            return response()->json([
                'success' => false,
                'message' => 'Empreendimento não encontrado',
            ], 404);
        }

        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'cidade' => 'required|string|max:255',
            'estado' => 'required|string|size:2',
            'valor_total' => 'required|numeric|gt:0',
            'quantidade_unidades' => 'required|integer|gt:0',
            'valor_unidade' => 'required|numeric|gt:0',
            'status' => 'required|string|in:em_lancamento,em_obras,entregue',
        ]);

        $empreendimento->update($validated);

        return response()->json([
            'success' => true,
            'data' => $empreendimento,
            'message' => 'Empreendimento atualizado com sucesso',
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $empreendimento = Empreendimento::find($id);

        if (!$empreendimento) {
            return response()->json([
                'success' => false,
                'message' => 'Empreendimento não encontrado',
            ], 404);
        }

        $empreendimento->delete();

        return response()->json([
            'success' => true,
            'message' => 'Empreendimento removido com sucesso',
        ], 204);
    }
}
