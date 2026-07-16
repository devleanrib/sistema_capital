<?php

namespace App\Http\Controllers;

use App\Models\Empreendimento;
use App\Http\Resources\EmpreendimentoResource;
use App\Http\Requests\StoreEmpreendimentoRequest;
use App\Http\Requests\UpdateEmpreendimentoRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EmpreendimentoController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Empreendimento::query();

        if ($request->filled('busca')) {
            $query->where('nome', 'ilike', '%' . $request->busca . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $empreendimentos = $query->orderBy('id', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => EmpreendimentoResource::collection($empreendimentos),
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
            'data' => new EmpreendimentoResource($empreendimento),
        ]);
    }

    public function store(StoreEmpreendimentoRequest $request): JsonResponse
    {
        $empreendimento = Empreendimento::create($request->validated());

        return response()->json([
            'success' => true,
            'data' => new EmpreendimentoResource($empreendimento),
            'message' => 'Empreendimento criado com sucesso',
        ], 201);
    }

    public function update(UpdateEmpreendimentoRequest $request, $id): JsonResponse
    {
        $empreendimento = Empreendimento::find($id);

        if (!$empreendimento) {
            return response()->json([
                'success' => false,
                'message' => 'Empreendimento não encontrado',
            ], 404);
        }

        $empreendimento->update($request->validated());

        return response()->json([
            'success' => true,
            'data' => new EmpreendimentoResource($empreendimento),
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
