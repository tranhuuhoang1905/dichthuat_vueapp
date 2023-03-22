<?php

namespace App\Http\Controllers\API;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Illuminate\Support\Facades\Hash;

// test export file excel
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UsersExport;
use App\Exports\DataExport;
use Illuminate\Support\Collection;
// test export file excel
use Validator;

class UserController extends Controller
{
    // all languages
    public function allusers()
    {
        $users = User::with('roles')->get()
            ->toArray();
        return response()->json($users);
    }
    // all roles
    public function roles()
    {
        $roles = Role::all()
            ->toArray();
        return response()->json($roles);
    }
    //     createNewUser

    public function createNewUser(Request $request)
    {
        $role = Role::where('id', $request->input('role'))->get()->first();
        if ($role){
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
            ]);
            $user->assignRole($role->name);
            return response()->json('The user successfully created');
        }else{
            return response()->json('Role not found');
        }
    }

    // edit word
    public function edit($id)
    {
        $user  = User::where('id', $id)->get()->first();
        $user->load('roles');
        $roles = Role::all()->toArray();
        return response()->json([
            'user'=>$user,
            'roles'=>$roles
        ]);
    }

    // update user
    public function changeRoleUser($id, Request $request)
    {
        $user = User::find($id);
        $user->load('roles');
        $role = Role::where('id', $request->input('role'))->get()->first();
        // $User->assignRole($role->name);
        if($user->roles){
            foreach ($user->roles as $roleUser) {
                $user->removeRole($roleUser->name);
            }
        }
        $user->assignRole($role->name);
        return response()->json('The user successfully updated');
    }

    // update user
    public function changePasswordUser($id, Request $request)
    {
        $user = User::find($id);
        $password = $request->input('password');
        $repassword = $request->input('repassword');
        if($password !== $repassword or !$password){
            return response()->json('The user false to updated');
        }
        $user->password = Hash::make($password);
        $user->save();
        return response()->json('The user successfully updated');
    }

    // test export file excel
    public function export()
    {
        // $users = new Collection([
        //     ['name' => 'John Doe', 'email' => 'johndoe@example.com'],
        //     ['name' => 'Jane Doe', 'email' => 'janedoe@example.com'],
        // ]);

        $fileName = 'users.xlsx';

        // $excelFile = Excel::download(function ($excel) use ($users) {
        //     $excel->sheet('Sheet1', function ($sheet) use ($users) {
        //         $sheet->fromArray($users);
        //     });
        // }, $fileName, \Maatwebsite\Excel\Excel::XLSX);
        return Excel::download(new UsersExport, $fileName);
        // return $excelFile;
    }

    public function uploadExcel(Request $request)
    {
        $file = $request->file('file');
        $data = Excel::toArray(new Excel(), $file);
        $dataResponse = [];
        foreach ($data[0] as $element){
            $dataResponse[] = [$element[0],$element[1],$element[2]];
        }
        // $users = collect($dataResponse);
        // $users = collect([
        //     ['name' => 'John Doe', 'email' => 'johndoe@example.com'],
        //     ['name' => 'Jane Doe', 'email' => 'janedoe@example.com']
        // ]);
        $export = new DataExport(collect($dataResponse));
        $fileName = 'usersedit.xlsx';
        return Excel::download($export, $fileName);
        // return response()->json( ['data_input'=>$data,'data_output'=>$dataResponse]);
    }

    
}
