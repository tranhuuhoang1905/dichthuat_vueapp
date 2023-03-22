<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;

class UsersExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return User::all();
        // $users = collect([
        //     ['name' => 'John Doe', 'email' => 'johndoe@example.com'],
        //     ['name' => 'Jane Doe', 'email' => 'janedoe@example.com']
        // ]);
        // return $users;
    }
}
