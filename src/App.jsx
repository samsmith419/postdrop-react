import { AppProvider, useApp } from './context';
import LangBar from './components/LangBar';
import Landing from './screens/Landing';
import Editor from './screens/Editor';
import Drop from './screens/Drop';
import Done from './screens/Done';

function Screen() {
  const { screen } = useApp();

  return (
    <>
      <LangBar />
      {screen === 'landing' && <Landing />}
      {screen === 'editor' && <Editor />}
      {screen === 'drop' && <Drop />}
      {screen === 'done' && <Done />}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Screen />
    </AppProvider>
  );
}
