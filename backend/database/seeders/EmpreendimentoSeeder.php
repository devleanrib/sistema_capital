<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmpreendimentoSeeder extends Seeder
{
    public function run(): void
    {
        $empreendimentos = [
            [
                'nome' => 'Residencial Aurora',
                'cidade' => 'Sao Paulo',
                'estado' => 'SP',
                'valor_total' => 45000000.00,
                'quantidade_unidades' => 120,
                'valor_unidade' => 375000.00,
                'status' => 'em_lancamento',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Condominio Vista Verde',
                'cidade' => 'Campinas',
                'estado' => 'SP',
                'valor_total' => 28000000.00,
                'quantidade_unidades' => 80,
                'valor_unidade' => 350000.00,
                'status' => 'em_obras',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Torre Sao Paulo',
                'cidade' => 'Sao Paulo',
                'estado' => 'SP',
                'valor_total' => 95000000.00,
                'quantidade_unidades' => 200,
                'valor_unidade' => 475000.00,
                'status' => 'entregue',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Residencial Praia Sul',
                'cidade' => 'Rio de Janeiro',
                'estado' => 'RJ',
                'valor_total' => 62000000.00,
                'quantidade_unidades' => 150,
                'valor_unidade' => 413333.33,
                'status' => 'em_lancamento',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Edificio Copacabana',
                'cidade' => 'Rio de Janeiro',
                'estado' => 'RJ',
                'valor_total' => 78000000.00,
                'quantidade_unidades' => 180,
                'valor_unidade' => 433333.33,
                'status' => 'em_obras',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Condominio Serra Azul',
                'cidade' => 'Belo Horizonte',
                'estado' => 'MG',
                'valor_total' => 35000000.00,
                'quantidade_unidades' => 100,
                'valor_unidade' => 350000.00,
                'status' => 'entregue',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Residencial Lago Dourado',
                'cidade' => 'Curitiba',
                'estado' => 'PR',
                'valor_total' => 42000000.00,
                'quantidade_unidades' => 110,
                'valor_unidade' => 381818.18,
                'status' => 'em_lancamento',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nome' => 'Empresarial Tech Park',
                'cidade' => 'Florianopolis',
                'estado' => 'SC',
                'valor_total' => 55000000.00,
                'quantidade_unidades' => 90,
                'valor_unidade' => 611111.11,
                'status' => 'em_obras',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('empreendimentos')->insert($empreendimentos);
    }
}
