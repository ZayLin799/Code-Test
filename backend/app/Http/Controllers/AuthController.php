<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Validator;
use App\Http\Controllers\BaseController as BaseController;

class AuthController extends BaseController
{
    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|min:2|max:100',
                'email' => 'required|string|email|max:100|unique:users',
                'password' => 'required|string|confirmed|min:6',
                'role_id' => 'required',
            ]);

            if($validator->fails()) {
                return $this->handleError($validator->errors());
            }

            $user = User::create([
                        'name' => $request->name,
                        'email' => $request->email,
                        'password' => Hash::make($request->password),
                        'role_id' => $request->role_id
                    ]);

            $users = User::with('roles')->where('id',$user->id)->first();

            $token = JWTAuth::attempt(['name'=>$request->name,'password'=>$request->password]);
            $success['token'] = $this->respondWithToken($token);
            $success['user'] = $users;

            return $this->handleResponse($success, 'User successfully registered');

        }  catch (\Exception $e) {

            return $this->handleError($e->getMessage());

        }
    }

    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);

            if($validator->fails()) {
                return $this->handleError($validator->errors());
            }

            if (!$token = JWTAuth::attempt($validator->validated())) {
                return $this->handleError('Unauthorised.', ['error' => 'Unauthorised'],401);
            } else {
                $user = Auth::user();
                $users = User::with('roles')->where('id',$user->id)->first();
                $success['token'] = $this->respondWithToken($token);
                $success['user'] = $users;

                return $this->handleResponse($success, 'User logged-in!');
            }

        }  catch (\Exception $e) {

            return $this->handleError($e->getMessage());

        }
    }


    public function logout(Request $request)
    {
        auth()->logout();
        return response()->json(['status' => 'success', 'message' => 'User logged out successfully']);
    }

}
