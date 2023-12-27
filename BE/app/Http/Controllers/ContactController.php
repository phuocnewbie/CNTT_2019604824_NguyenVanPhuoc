<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use Illuminate\Support\Facades\Mail;


class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $keyword = request()->keyword;
        $contact = Contact::where("id", "like", "%" . $keyword . "%")
             ->orWhere('full_name', 'LIKE', "%" . $keyword . "%")
             ->orWhere('email', 'LIKE', "%" . $keyword . "%")
             ->orWhere('phone', 'LIKE', "%" . $keyword . "%")
             ->orderBy('is_feedback')->paginate(10);
        return response()->json(['data' => $contact], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreContactRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreContactRequest $request)
    {
        Contact::create($request->all());
        return response()->json([
            'message' => "Liên hệ đã được gửi tới bộ phận chăm sóc khách hàng!",
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateContactRequest  $request
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateContactRequest $request, $contactId)
    {
        $contactFind = Contact::find($contactId);

        if (!$contactFind)
            return response()->json(['message' => 'Không tìm thấy liên hệ cần phản hồi!'], 404);
        
        $contactFind->is_feedback = $request->get('is_feedback');
        $contactFind->save();

        #Queue

        Mail::send('emails.contact', compact('contactFind'), function($email) use($contactFind) {
            $email->subject("Hoàn Mỹ Store - Chăm sóc khách hàng");
            $email->to($contactFind->email, $contactFind->full_name);
        });

        return response()->json([
            'message' => "Đã gửi phản hồi đến khách hàng!",
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contact $contact)
    {
        //
    }
}
