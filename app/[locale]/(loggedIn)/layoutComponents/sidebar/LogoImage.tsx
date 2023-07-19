interface LogoImageProps {
  className?: string;
}

const LogoImage = ({ className }: LogoImageProps) => {
  return (
    <span>
      <picture>
        <img
          className={className}
          src="/images/logo.svg"
          alt="Trunk-Player NG logo"
        />
      </picture>
    </span>
  );
};

export default LogoImage;
