import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EXAMPLE_ITINERARIES } from '../data/exampleItineraries';
import Dashboard from '../components/Dashboard';

interface Props {
  setShowNavbar: (show: boolean) => void;
}

const ExampleItineraryView: React.FC<Props> = ({ setShowNavbar }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const example = EXAMPLE_ITINERARIES.find((ex: any) => ex.slug === slug);

  useEffect(() => {
    if (!example) {
      navigate('/');
    } else {
      document.title = `${example.title} - AriaTrip AI`;
      setShowNavbar(false);
    }
    
    return () => {
      setShowNavbar(true);
    };
  }, [example, navigate, setShowNavbar]);

  if (!example) return null;

  return (
    <div className="w-full h-full">
      <Dashboard 
        initialPlan={example.plan} 
        preferences={example.preferences} 
        onNewTrip={() => {
          setShowNavbar(true);
          navigate('/');
        }} 
        isExample={true}
      />
    </div>
  );
};

export default ExampleItineraryView;
