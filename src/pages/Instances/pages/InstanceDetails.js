import { useParams } from 'react-router-dom';

const InstanceDetails = () => {
  const { id } = useParams();
  return (
    "Instance details: " + id
  );
};

export default InstanceDetails;