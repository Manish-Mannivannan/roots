'use client';

import { supabase } from './supabaseClient';

export const PERSON_IMAGE_BUCKET = 'family-photos';

/**
 * Build a consistent storage path for a person's image.
 * Example: "persons/<personId>.jpg"
 */
export function buildPersonImagePath(personId: string, extension = 'jpg'): string {
  if (!personId) {
    throw new Error('buildPersonImagePath: personId is required');
  }

  const safeExt = extension.replace('.', '').toLowerCase() || 'jpg';
  return `persons/${personId}.${safeExt}`;
}

/**
 * Upload or replace a person's image in the "family-photos" bucket.
 * - personId: your persons.id
 * - file: File or Blob from an <input type="file"> or drag-and-drop
 *
 * Returns the storage path you should store in persons.image_path.
 */
export async function uploadPersonImage(
  personId: string,
  file: File | Blob,
  opts?: {
    extension?: string;           // default inferred from File.type or "jpg"
    contentType?: string;         // override content type if needed
    upsert?: boolean;             // default true (replace existing)
  }
): Promise<{ imagePath: string }> {
  if (!personId) {
    throw new Error('uploadPersonImage: personId is required');
  }
  if (!file) {
    throw new Error('uploadPersonImage: file is required');
  }

  const extensionFromOpts = opts?.extension;
  const extensionFromType =
    'type' in file && file.type
      ? file.type.split('/')[1] // e.g. "image/png" -> "png"
      : undefined;

  const extension = extensionFromOpts || extensionFromType || 'jpg';
  const imagePath = buildPersonImagePath(personId, extension);

  const contentType =
    opts?.contentType ||
    ('type' in file && file.type ? file.type : 'image/jpeg');

  const { error } = await supabase.storage
    .from(PERSON_IMAGE_BUCKET)
    .upload(imagePath, file, {
      upsert: opts?.upsert ?? true,
      contentType,
    });

  if (error) {
    console.error('uploadPersonImage: upload failed', error);
    throw new Error(error.message);
  }

  return { imagePath };
}

/**
 * Get a public URL for a person's image.
 * Use this if your bucket is PUBLIC.
 *
 * Returns null if imagePath is falsy.
 */
export function getPublicPersonImageUrl(imagePath: string | null | undefined): string | null {
  if (!imagePath) return null;

  const { data } = supabase.storage
    .from(PERSON_IMAGE_BUCKET)
    .getPublicUrl(imagePath);

  return data?.publicUrl ?? null;
}

/**
 * Get a signed URL for a person's image.
 * Use this if your bucket is PRIVATE.
 *
 * expiresIn: seconds until the URL expires (default 1 hour).
 * Returns null if imagePath is falsy.
 */
export async function getSignedPersonImageUrl(
  imagePath: string | null | undefined,
  expiresInSeconds = 60 * 60
): Promise<string | null> {
  if (!imagePath) return null;

  const { data, error } = await supabase.storage
    .from(PERSON_IMAGE_BUCKET)
    .createSignedUrl(imagePath, expiresInSeconds);

  if (error) {
    console.error('getSignedPersonImageUrl: failed', error);
    return null;
  }

  return data?.signedUrl ?? null;
}

/**
 * Delete a person's image from storage.
 * Safe to call even if the image does not exist.
 */
export async function deletePersonImage(imagePath: string | null | undefined): Promise<void> {
  if (!imagePath) return;

  const { error } = await supabase.storage
    .from(PERSON_IMAGE_BUCKET)
    .remove([imagePath]);

  if (error) {
    console.error('deletePersonImage: failed', error);
    throw new Error(error.message);
  }
}
