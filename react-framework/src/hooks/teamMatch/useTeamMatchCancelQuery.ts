import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation } from 'react-query';

const fetcher = (matchCancel: number) => axios.delete(SERVER_URL + '/team/matching', { params : {teamId: matchCancel} });

const useTeamMatchCancelQuery = () => {
  return useMutation(fetcher, {
    onSuccess: () => {
      location.replace('/team-match')
    },
  });
};

export default useTeamMatchCancelQuery;    