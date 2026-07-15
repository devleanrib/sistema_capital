<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmpreendimentoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'cidade' => 'required|string|max:255',
            'estado' => 'required|string|size:2',
            'valor_total' => 'required|numeric|gt:0',
            'quantidade_unidades' => 'required|integer|gt:0',
            'valor_unidade' => 'required|numeric|gt:0',
            'status' => 'required|string|in:em_lancamento,em_obras,entregue',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome é obrigatório',
            'nome.string' => 'O nome deve ser uma string',
            'nome.max' => 'O nome não pode ter mais de 255 caracteres',
            'cidade.required' => 'A cidade é obrigatória',
            'cidade.string' => 'A cidade deve ser uma string',
            'cidade.max' => 'A cidade não pode ter mais de 255 caracteres',
            'estado.required' => 'O estado é obrigatório',
            'estado.string' => 'O estado deve ser uma string',
            'estado.size' => 'O estado deve ter 2 caracteres',
            'valor_total.required' => 'O valor total é obrigatório',
            'valor_total.numeric' => 'O valor total deve ser um número',
            'valor_total.gt' => 'O valor total deve ser maior que zero',
            'quantidade_unidades.required' => 'A quantidade de unidades é obrigatória',
            'quantidade_unidades.integer' => 'A quantidade de unidades deve ser um número inteiro',
            'quantidade_unidades.gt' => 'A quantidade de unidades deve ser maior que zero',
            'valor_unidade.required' => 'O valor da unidade é obrigatório',
            'valor_unidade.numeric' => 'O valor da unidade deve ser um número',
            'valor_unidade.gt' => 'O valor da unidade deve ser maior que zero',
            'status.required' => 'O status é obrigatório',
            'status.string' => 'O status deve ser uma string',
            'status.in' => 'O status deve ser: em_lancamento, em_obras ou entregue',
        ];
    }
}
