"use client";

import React, { useState } from "react";

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

    if (showReceipt) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border-t-8 border-lamaPurple">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Digital Receipt</h2>
                            <p className="text-gray-500 text-sm">Receipt #{Math.floor(100000 + Math.random() * 900000)}</p>
                        </div>
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">PAID</div>
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
                            <span className="font-bold text-lg">${amount}</span>
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
                            onClick={() => {
                                // In a real app, this would trigger a PDF download or print
                                window.print();
                            }}
                            className="w-full bg-lamaSky text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
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
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transition-all scale-100">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Confirm Payment</h2>
                <p className="text-gray-500 mb-6 font-medium">Record payment for <span className="text-lamaPurple font-bold">{student.name}</span></p>

                <div className="space-y-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Payment Amount ($)</label>
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

                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 bg-lamaPurple text-white px-4 py-3 rounded-xl font-bold hover:opacity-90 shadow-lg shadow-purple-100 transition-all"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPaymentModal;
