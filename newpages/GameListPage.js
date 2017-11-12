import React from 'react';
import {
  Text,
  View,
  // Image,
  // TextInput,
  // TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import moment from 'moment';
import { Font } from 'expo';

// import IMAGES from '../common/images';
import COLORS, { alpha } from '../common/colors';
import { commonStyle as cs, font } from '../common/styles';
// import { IconButton } from '../components';
import { BarGraph, GamesList, SignUpForm, GameDetails } from '../components';
// import { STUDENT_ROLE, COUNSELOR_ROLE } from '../common/constants';
import { gamesAPI } from '../common/api';
// import { getCategoryById, getUserImage } from '../common/helper';

class GameListPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    authToken: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      // searchTerm: '',
      games: null,
      refreshing: false,
      loading: false,
    };
  }
  
  fetchGames = async () =>{
    const gamesResponse = await gamesAPI() || {};
    console.log(gamesResponse);
    if (gamesResponse.success !== false) {
      this.setState({ games: gamesResponse});
    }
  }
  
  async componentDidMount() {
    await this.fetchGames();
  }

  onRefresh = () => {
    if (!this.state.refreshing) {
      this.fetchGames();
    }
  }

  render() {
    const { games, refreshing, loading, addingMore } = this.state;
    const { game_list } = games || {
      game_list: [],
    };
    return (
      <GamesList games={game_list}/>
    );
  }
}

const mapStateToProps
  = ({
    filters,
    loginState: { authToken },
    categories,
    currentUser,
    appState: { forumNumber },
  }) => ({ filters, authToken, categories, forumNumber, currentUser });

export default connect(mapStateToProps)(GameListPage);
