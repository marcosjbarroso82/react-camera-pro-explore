import { Layout } from '../components/Layout';
import CameraExplorer from '../components/CameraExplorer';

export default function Camera() {
  return (
    <Layout>
      <div className="h-full">
        <CameraExplorer />
      </div>
    </Layout>
  );
}

