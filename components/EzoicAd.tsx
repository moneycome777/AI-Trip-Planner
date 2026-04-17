import React, { useEffect } from 'react';

interface EzoicAdProps {
  id: number;
}

const EzoicAd: React.FC<EzoicAdProps> = ({ id }) => {
  useEffect(() => {
    // Ezoic's standalone global variable
    const ez = (window as any).ezstandalone;
    if (ez && ez.cmd) {
      ez.cmd.push(function () {
        ez.showAds(id);
      });
    }
  }, [id]);

  return (
    <div className="w-full flex justify-center my-4 overflow-hidden min-h-[50px]">
      <div id={`ezoic-pub-ad-placeholder-${id}`}></div>
    </div>
  );
};

export default EzoicAd;
