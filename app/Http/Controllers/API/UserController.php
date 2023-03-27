<?php

namespace App\Http\Controllers\API;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Validator;
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
    public function adminChangePasswordUser($id, Request $request)
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
    // update user
    public function updateUser( Request $request)
    {
        $user = $request->user();
        $userUpdate = User::find($user->id);
        $userUpdate->last_name = $request->input('last_name');
        $userUpdate->first_name = $request->input('first_name');
        $userUpdate->phone_number = $request->input('phone_number');
        $userUpdate->address = $request->input('address');
        $userUpdate->save();
        return response()->json(['success'=>true,'message'=>"update success"]);
    }

    /**
     * Xử lý yêu cầu đăng nhập.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function userChangePassword(Request $request)
    {
        $user = $request->user();
        $userUpdate = User::find($user->id);
        // return response()->json($user->password);
        if (!Hash::check($request->input('password'), $user->password)) {
            return response()->json('Password false');
        }
        $passwordNew = $request->input('password_new');
        $repasswordNew = $request->input('repassword_new');
        if($passwordNew !== $repasswordNew or !$passwordNew){
            return response()->json('The user false to updated');
        }
        $user->password = Hash::make($passwordNew);
        $user->save();
        return response()->json('The user successfully updated');
    }
    

    // test export file excel
    // public function export()
    // {
    //     $fileName = 'users.xlsx';

    //     return Excel::download(new UsersExport, $fileName);
    // }

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
