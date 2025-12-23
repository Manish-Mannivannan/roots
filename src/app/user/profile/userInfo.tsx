// src/app/user/profile/userInfo.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import type { EditableProfile, UserProfile } from '../../types/interfaces';

type UserInfoProps = {
  user: User;
  profile: UserProfile;
};

const UserInfo: React.FC<UserInfoProps> = ({ user, profile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<EditableProfile>({
    full_name: profile.full_name ?? '',
    birth_date: profile.birth_date ?? '',
    phone: profile.phone ?? '',
    address: profile.address ?? '',
  });

  const handleChange =
    (field: keyof EditableProfile) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSave = async () => {
    setSaving(true);

    const { error: updateError } = await supabase
      .from('users')
      .update({
        full_name: form.full_name || null,
        birth_date: form.birth_date || null,
        phone: form.phone || null,
        address: form.address || null,
      })
      .eq('id', profile.id);

    if (updateError) {
      console.error('Error updating profile:', updateError.message);
    } else {
      setIsEditing(false);
    }

    setSaving(false);
  };

  const displayName = form.full_name || user.email || 'Roots user';

  return (
    <section className="w-full h-full flex items-start justify-center p-6 md:p-8">
      <div className="w-full max-w-4xl rounded-[32px] bg-offWhite/90 shadow-2xl border border-white/40 backdrop-blur-md p-8 md:p-10 flex flex-col gap-8">
        {/* HEADER ROW */}
        <header className="flex flex-col md:flex-row items-center md:items-start gap-6 justify-between">
          <div className="flex items-center gap-6">
            <div className="avatar">
              <div className="w-24 h-24 rounded-full ring ring-palette4 ring-offset-base-100 ring-offset-2 overflow-hidden shadow-md">
                {profile.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={displayName}
                    width={96}
                    height={96}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-700 text-3xl text-offWhite">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-palette3 via-palette4 to-palette5 bg-clip-text text-transparent">
                {displayName}
              </h1>
              <p className="text-sm text-neutral-500">
                {user.email ?? 'No email found'}
              </p>
              <p className="text-xs text-neutral-400">
                Member since{' '}
                {new Date(profile.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Edit / Save buttons */}
          <div className="flex gap-2 mt-4 md:mt-0">
            {isEditing ? (
              <>
                <button
                  className="btn btn-sm border-palette3 bg-offWhite text-palette3 hover:bg-palette3 hover:text-offWhite"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => setIsEditing(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="btn btn-sm border-palette3 bg-offWhite text-palette3 hover:bg-palette3 hover:text-offWhite"
                onClick={() => setIsEditing(true)}
              >
                Edit profile
              </button>
            )}
          </div>
        </header>

        <div className="divider my-0" />

        {/* FIELDS GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label="Name"
            value={form.full_name}
            isEditing={isEditing}
            onChange={handleChange('full_name')}
            placeholder="Your name"
          />

          <Field
            label="Email"
            value={user.email ?? ''}
            isEditing={false}
            readOnly
          />

          <Field
            label="Birth date"
            value={form.birth_date}
            isEditing={isEditing}
            onChange={handleChange('birth_date')}
            type="date"
            placeholder="YYYY-MM-DD"
          />

          <Field
            label="Phone"
            value={form.phone}
            isEditing={isEditing}
            onChange={handleChange('phone')}
            placeholder="+47 ..."
          />

          <div className="md:col-span-2">
            <Field
              label="Address"
              value={form.address}
              isEditing={isEditing}
              onChange={handleChange('address')}
              placeholder="Street, city, country"
              multiline
            />
          </div>
        </section>

        {/* FUTURE: connect to FamilyNode */}
        <section className="mt-2 flex justify-end">
          <button className="btn btn-outline border-palette3 text-palette3 hover:bg-palette3 hover:text-offWhite">
            Link to my family node
          </button>
        </section>
      </div>
    </section>
  );
};

export default UserInfo;

/* ----------------------- Field Component ----------------------- */

type FieldProps = {
  label: string;
  value: string;
  isEditing: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  readOnly?: boolean;
};

const Field: React.FC<FieldProps> = ({
  label,
  value,
  isEditing,
  onChange,
  placeholder,
  type = 'text',
  multiline = false,
  readOnly = false,
}) => {
  const baseLabel =
    'text-xs font-semibold uppercase tracking-wide text-neutral-500';
  const baseBox =
    'mt-1 w-full rounded-xl border border-neutral-200 bg-white/70 px-3 py-2 text-sm text-neutral-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-palette3/60 focus:border-transparent placeholder:text-neutral-300';

  if (!isEditing || readOnly) {
    return (
      <div className="flex flex-col">
        <span className={baseLabel}>{label}</span>
        <span className="mt-1 text-sm text-neutral-800">
          {value || <span className="italic text-neutral-400">Not set</span>}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <label className={baseLabel}>{label}</label>
      {multiline ? (
        <textarea
          className={`${baseBox} min-h-[72px] resize-none`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          className={baseBox}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
