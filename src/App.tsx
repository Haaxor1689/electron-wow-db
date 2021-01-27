/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FaSync } from 'react-icons/fa';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import IconButton from './components/IconButton';
import { Flex } from './components/Styled';
import Text from './components/Text';
import { useDatabaseProvider } from './hooks/useDatabase';
import DbLogin from './pages/DbLogin';
import Tabs from './pages/Tabs';
import { GlobalStyles, ThemeProvider } from './theme';

const queryClient = new QueryClient();

export default function App() {
	const {
		DatabaseContextProvider,
		value,
		error,
		loading,
		retryConnection,
	} = useDatabaseProvider();
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<DatabaseContextProvider value={value}>
					<Flex as="main" height="100vh" flexDirection="column">
						{!loading && error && (
							<Flex
								bg="bgError"
								css={(theme) => css`
									border-bottom-width: 1px;
									border-color: ${theme.colors.borderError};
								`}
							>
								<Text color="textError" m={2}>
									<Text as="span" fontWeight="bold">
										There was an error connecting to database:{' '}
									</Text>
									{error}.
								</Text>
								<IconButton color="textError" onClick={retryConnection}>
									<FaSync />
								</IconButton>
							</Flex>
						)}
						{!value.sql ? <DbLogin loading={loading} /> : <Tabs />}
					</Flex>
				</DatabaseContextProvider>
				<GlobalStyles />
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
