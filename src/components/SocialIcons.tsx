type IconProps = {
  className?: string;
};

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#E6EDF3"
        d="M12 2a10 10 0 0 0-3.162 19.487c.5.092.682-.216.682-.481 0-.237-.009-.866-.013-1.7-2.777.603-3.363-1.34-3.363-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.004.07 1.532 1.031 1.532 1.031.893 1.53 2.343 1.088 2.914.833.09-.647.35-1.088.636-1.338-2.217-.252-4.549-1.109-4.549-4.938 0-1.09.39-1.98 1.03-2.678-.102-.253-.447-1.268.098-2.643 0 0 .84-.269 2.75 1.023A9.56 9.56 0 0 1 12 6.844c.85.004 1.706.115 2.505.337 1.909-1.292 2.747-1.023 2.747-1.023.547 1.375.202 2.39.099 2.643.64.698 1.028 1.588 1.028 2.678 0 3.839-2.336 4.683-4.56 4.93.359.309.678.92.678 1.855 0 1.339-.012 2.419-.012 2.748 0 .267.18.577.688.48A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#FF0000"
        d="M21.582 7.196a2.993 2.993 0 0 0-2.106-2.118C17.615 4.5 12 4.5 12 4.5s-5.615 0-7.476.578A2.993 2.993 0 0 0 2.418 7.196C1.84 9.07 1.84 12 1.84 12s0 2.93.578 4.804a2.993 2.993 0 0 0 2.106 2.118C6.385 19.5 12 19.5 12 19.5s5.615 0 7.476-.578a2.993 2.993 0 0 0 2.106-2.118C22.16 14.93 22.16 12 22.16 12s0-2.93-.578-4.804Z"
      />
      <path fill="#FFFFFF" d="M10.2 15.2V8.8L15.8 12l-5.6 3.2Z" />
    </svg>
  );
}

export function WcaLogoIcon({ className }: IconProps) {
  return (
    // Official WCA logo asset (same as worldcubeassociation.org header)
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/icons/wca-logo.svg" alt="" aria-hidden="true" className={className} />
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.728 20.452H3.947V9h2.781v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

export function ExternalLinkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M14 5h5v5M10 14 19 5M15 10v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h8"
        stroke="#2dd4bf"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
