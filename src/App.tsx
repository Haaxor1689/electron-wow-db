import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Flex } from './components/Styled';
import { useDatabaseProvider } from './hooks/useDatabase';
import Home from './pages/Home';
import { GlobalStyles, ThemeProvider } from './theme';

const queryClient = new QueryClient();

export default function App() {
	const { DatabaseContextProvider, value } = useDatabaseProvider();
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<DatabaseContextProvider value={value}>
					<Flex as="main" height="100vh" flexDirection="column">
						<Router>
							<Switch>
								<Route path="/" component={Home} />
							</Switch>
						</Router>
					</Flex>
				</DatabaseContextProvider>
				<GlobalStyles />
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
