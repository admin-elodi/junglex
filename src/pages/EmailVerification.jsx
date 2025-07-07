import React from 'react';

const EmailVerification = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white text-center p-8">
      <div>
        <h1 className="text-3xl font-bold mb-4 text-emerald-300">📧 Verify Your Email</h1>
        <p className="mb-2">
          A verification link has been sent to your email address.
        </p>
        <p className="text-sm text-gray-400">
          Please click the link in your inbox to activate your JungleX account.
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
