"use client";

import React, { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
    student: {
        id: number;
        name: string;
        studentId: string;
        balance: number;
        totalDue: number;
    };
    onClose: () => void;
    onConfirm: (amount: number) => void;
};

const ConfirmPaymentModal = ({ student, onClose, onConfirm }: Props) => {
    const [amount, setAmount] = useState(student.balance);
    const [showReceipt, setShowReceipt] = useState(false);

    const handleConfirm = () => {
        onConfirm(amount);
        setShowReceipt(true);
    };

    return (
        <AlertDialog open={true} onOpenChange={(open) => !open && onClose()}>
            <AlertDialogContent className="max-w-md rounded-2xl">
                {showReceipt ? (
                    <div className="p-2">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Digital Receipt</h2>
                                <p className="text-gray-500 text-sm">Receipt #{Math.floor(100000 + Math.random() * 900000)}</p>
                            </div>
                            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">PAID</div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Student Name:</span>
                                <span className="font-semibold">{student.name}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Student ID:</span>
                                <span className="font-semibold">{student.studentId}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Amount Paid:</span>
                                <span className="font-bold text-lg text-lamaSky">${amount}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Remaining Balance:</span>
                                <span className="font-semibold text-red-500">${student.balance - amount}</span>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span className="text-gray-600">Date:</span>
                                <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => window.print()}
                                className="w-full bg-lamaSky text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-sky-100"
                            >
                                Print Receipt
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl">Confirm Payment</AlertDialogTitle>
                            <AlertDialogDescription>
                                Record payment for <span className="text-lamaPurple font-bold">{student.name}</span>
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <div className="space-y-6 my-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Payment Amount ($)</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-full p-4 border-2 border-gray-100 rounded-xl bg-gray-50 focus:border-lamaSky focus:bg-white outline-none transition-all text-2xl font-bold text-gray-800"
                                    placeholder="0.00"
                                />
                            </div>

                            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-gray-600 italic">Current Balance:</span>
                                    <span className="text-gray-900 font-bold">${student.balance}</span>
                                </div>
                            </div>
                        </div>

                        <AlertDialogFooter className="gap-2 sm:gap-0">
                            <AlertDialogCancel onClick={onClose} className="rounded-xl border-gray-200 font-bold h-12">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleConfirm}
                                className="bg-lamaPurple hover:bg-lamaPurple/90 text-white rounded-xl font-bold h-12 shadow-lg shadow-purple-100"
                            >
                                Confirm Payment
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmPaymentModal;
