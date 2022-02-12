interface LogoImageProps {
  className?: string;
}

const LogoImage = ({ className }: LogoImageProps) => {
  return (
    <span>
      <img
        className={className}
        src="/images/logo.svg"
        alt="Trunk-Player NG logo"
      />
    </span>
  );
};

export default LogoImage;
