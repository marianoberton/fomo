import crypto from 'crypto';

const APP_SECRET = process.env.META_APP_SECRET;

/**
 * Verify WhatsApp webhook signature for security
 * This ensures the webhook is actually coming from Meta/WhatsApp
 */
export function verifyWhatsAppSignature(payload: string, signature: string | null): boolean {
  if (!APP_SECRET) {
    console.warn('META_APP_SECRET not configured - skipping signature verification');
    return true; // Allow in development, but log warning
  }

  if (!signature) {
    console.log('No signature provided');
    return false;
  }

  try {
    // Remove 'sha256=' prefix if present
    const cleanSignature = signature.replace('sha256=', '');
    
    // Calculate expected signature
    const expectedSignature = crypto
      .createHmac('sha256', APP_SECRET)
      .update(payload, 'utf8')
      .digest('hex');

    // Use timingSafeEqual to prevent timing attacks
    const signatureBuffer = Buffer.from(cleanSignature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (signatureBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
}

/**
 * Generate a secure verify token for webhook setup
 */
export function generateVerifyToken(): string {
  return crypto.randomBytes(32).toString('hex');
} 