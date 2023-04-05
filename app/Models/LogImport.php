<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class LogImport extends Model
{
    use HasFactory;
    protected $table = 'log_import';

    protected $fillable = [
        'user_id',
        'language_id',
        'language_translate_id',
        'status',
        'file_name'
    ];
    
}
