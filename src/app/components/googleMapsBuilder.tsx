function buildGoogleMapsEmbedUrl(address: string) {
  // No API key version – works fine for simple embeds
  return `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}&output=embed`;
}

export default function GoogleMapsBuilder({ address }: { address: string }) {
  return (
    <iframe
      src={buildGoogleMapsEmbedUrl(address)}
      className="border-0 w-full h-full rounded-2xl"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
