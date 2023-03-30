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
            $responseData = [    'status' => 200,'success'=>true,    'message' => 'success',    'data' => $users];
        return response()->json($responseData);
    }
    // all roles
    public function roles()
    {
        $roles = Role::all()
            ->toArray();
        $responseData = [    'status' => 200,'success'=>true,    'message' => 'success',    'data' => $roles];
        return response()->json($responseData);
    }
    //     createNewUser

    public function createNewUser(Request $request)
    {
        $role = Role::where('id', $request->input('role'))->get()->first();
        $oldUser = User::where('email', $request->input('email'))->get()->first();
        if($oldUser){
            $responseData = [    'status' => 200,'success'=>true,    'message' => 'This account already exists'];
            return response()->json($responseData);
        }
        if ($role){
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
            ]);
            $user->assignRole($role->name);
            $responseData = [    'status' => 200,'success'=>true,    'message' => 'The user successfully created'];
            return response()->json($responseData);
        }else{
            $responseData = [    'success'=>true,    'message' => 'Role not found'];
            return response()->json($responseData);
        }
    }

    // edit word
    public function edit($id)
    {
        $user  = User::where('id', $id)->get()->first();
        $user->load('roles');
        $roles = Role::all()->toArray();
        $responseData = [
            'status' => 200,
            'message' => 'success',
            'data'=>[
                'user'=>$user,
                'roles'=>$roles
            ]
        ];
        return response()->json($responseData);
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
        $responseData = [    'status' => 200,'success'=>true,    'message' => 'The user successfully updated'];
        return response()->json($responseData);
    }

    // update user
    public function adminChangePasswordUser($id, Request $request)
    {
        $user = User::find($id);
        $password = $request->input('password');
        $repassword = $request->input('repassword');
        if($password !== $repassword or !$password){
            $responseData = ['success'=>true,    'message' => 'The user false to updated'];
            return response()->json($responseData);
        }
        $user->password = Hash::make($password);
        $user->save();
        $responseData = ['status' => 200,'success'=>true,    'message' => 'The user successfully updated'];
        return response()->json($responseData);
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
        $responseData = [    'status' => 200 ,'success'=>true,    'message' => 'The user successfully updated'];
        return response()->json($responseData);
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
            $responseData = [   'status' => 200,'success'=>true,     'message' => 'Password false'];
            return response()->json($responseData);
            
        }
        $passwordNew = $request->input('password_new');
        $repasswordNew = $request->input('repassword_new');
        if($passwordNew !== $repasswordNew or !$passwordNew){
            $responseData = [   'status' => 200,'success'=>true,     'message' => 'The user false to updated'];
            return response()->json($responseData);
        }
        $user->password = Hash::make($passwordNew);
        $user->save();
        $responseData = [   'status' => 200,'success'=>true,     'message' => 'The user successfully updated'];
        return response()->json($responseData);
    }
    
}
