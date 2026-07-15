<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empreendimento extends Model
{
    protected $fillable = [
        'nome',
        'cidade',
        'estado',
        'valor_total',
        'quantidade_unidades',
        'valor_unidade',
        'status',
    ];

    protected $casts = [
        'valor_total' => 'decimal:2',
        'valor_unidade' => 'decimal:2',
        'quantidade_unidades' => 'integer',
    ];
}
