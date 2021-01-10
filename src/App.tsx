import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Flex } from './components/Styled';
import { useDatabaseProvider } from './hooks/useDatabase';
import Tabs from './pages/Tabs';
import { GlobalStyles, ThemeProvider } from './theme';

const queryClient = new QueryClient();

export default function App() {
	const { DatabaseContextProvider, value } = useDatabaseProvider();
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<DatabaseContextProvider value={value}>
					<Flex as="main" height="100vh" flexDirection="column">
						<Tabs />
					</Flex>
				</DatabaseContextProvider>
				<GlobalStyles />
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
