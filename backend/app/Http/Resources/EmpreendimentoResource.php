<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmpreendimentoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'cidade' => $this->cidade,
            'estado' => $this->estado,
            'valor_total' => $this->valor_total,
            'quantidade_unidades' => $this->quantidade_unidades,
            'valor_unidade' => $this->valor_unidade,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
