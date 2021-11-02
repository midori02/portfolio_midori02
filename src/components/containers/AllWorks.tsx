import { useQueryClient } from 'react-query'

const queryClient = useQueryClient()
const allContents = queryClient.getQueryData('contents')
