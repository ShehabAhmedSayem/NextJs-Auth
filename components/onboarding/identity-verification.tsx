'use client';

import React, { useEffect, useState } from 'react';
import IdentifyVerificationForm from '../forms/identify-verification-form';
import { TailSpin } from '@/icons';
import VerificationError from './verification-error';
import VerifiedPage from './verified-page';
import { getUser } from '@/services/api-services';

const IdentityVerification = () => {
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [hasVerificationError, setHasVerificationError] = useState(false);

  useEffect(() => {
    const userInfo = async () => {
      try {
        const {
          data: { profile }
        } = await getUser();
        setIsVerified(profile?.isIdVerified ?? false);
      } finally {
        setLoading;
      }
    };

    userInfo();
  }, []);

  return (
    <div className="rounded-2xl border border-neutral-300 bg-neutral shadow">
      <div className="border-b border-neutral-200 p-8">
        <h1 className="text-3xl font-semibold">Identity Verification</h1>
        <p className="mt-2 text-neutral-600">Please verify your identity below</p>
      </div>
      <div className="p-8">
        {loading ? (
          <div className="m-auto my-40 w-max">
            <TailSpin className="text-[120px] text-neutral-400" />
          </div>
        ) : (
          <div>
            {isVerified ? (
              <div>
                <VerifiedPage />
              </div>
            ) : (
              <div>
                {hasVerificationError ? (
                  <div>
                    <VerificationError setHasVerificationError={setHasVerificationError} />
                  </div>
                ) : (
                  <div className="max-w-xl">
                    <IdentifyVerificationForm
                      setIsVerified={setIsVerified}
                      setHasVerificationError={setHasVerificationError}
                      setLoading={setLoading}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IdentityVerification;
