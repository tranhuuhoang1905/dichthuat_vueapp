<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Words extends Model
{
    use HasFactory;
    protected $table = 'words';

    protected $fillable = [
        'word',
        'language_id',
        'number_search',
        'number_add_notebook',
        'description',
        'pronunciation',
        'user_manual',
        'slug',
        'status',
        'synonym',
    ];
}
