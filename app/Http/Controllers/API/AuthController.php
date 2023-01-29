<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // if(Auth::attempt(['email'=>$request->email,'password'=>$request->password])){
        //     $user = Auth::user();
        //     $success['token'] = $user->createToken('MyApp')->plainTextToken;
        //     $success['name'] = $user->name;

        //     $response = [
        //         'success' => true,
        //         'data' => $success,
        //         'message' => 'User login successfully'
        //     ];
        //     return response()->json($response,200);
        // }else{
        //     $response = [
        //         'success' => false,
        //         'message' => 'Unauthorised'
        //     ];
        //     return response()->json($response);
        // }
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            // 'device_name' => 'required',
        ]);
     
        $user = User::where('email', $request->email)->first();
     
        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
     
        $success['token'] = $user->createToken('MyApp')->plainTextToken;
        $response = [
                    'success' => true,
                    'data' => $success,
                    'message' => 'User login successfully'
                ];
        return response()->json($response,200);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'confirm_password' => 'required|same:password'
        ]);

        if($validator->fails()){
            $response = [
                'success' => false,
                'message' => $validator->errors()
            ];
            return response()->json($response, 400);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);

        $success['token'] = $user->createToken('MyApp')->plainTextToken;
        $success['name'] = $user->name;

        $response = [
            'success' => true,
            'data' => $success,
            'message' => 'User register successfully'
        ];

        return response()->json($response,200);
    }

    public function logout()
    {
        auth()->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'You are logged out',
        ]);
    }
}
