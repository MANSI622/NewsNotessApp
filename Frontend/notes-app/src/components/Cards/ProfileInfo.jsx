
import React from 'react';
import { getInitials } from '../../utils/helper';

function ProfileInfo({ userInfo, onLogout }) {
  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
        { getInitials(userInfo?.fullName) }
      </div>
      <div>
        <button className="text-sm text-slate-700 underline hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded-md px-4 py-2 transition-all duration-300" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
