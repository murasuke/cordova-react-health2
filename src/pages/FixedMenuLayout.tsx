import { FC, useState } from 'react';
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  Label,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import useAuthState from 'hooks/useAuthState';
import { issuedAtTime } from '@firebase/util';
import useFitStepData from 'hooks/useFitApi';
import {
  storeStepList,
  queryStepList,
  deleteStepList,
} from 'utils/updateFirestore';

const FixedMenuLayout: FC = (props) => {
  const navigate = useNavigate();
  const { isSignedIn, userId, email, userName } = useAuthState();
  const [fixed, setFixed] = useState(false);

  const { queryData } = useFitStepData(60);

  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item
            as="a"
            header
            onClick={() => {
              navigate('/');
            }}
          >
            <Image
              size="mini"
              src="/11187.png"
              style={{ marginRight: '1.5em' }}
            />
          </Menu.Item>
          <Dropdown item simple text="歩数グラフ">
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  navigate('/daygraph/7');
                }}
              >
                直近1週間
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate('/weekgraph');
                }}
              >
                週間グラフ
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Header Item</Dropdown.Header>
              <Dropdown.Item>
                <i className="dropdown icon" />
                <span className="text">歩数データ</span>
                <Dropdown.Menu>
                  {isSignedIn ? (
                    <>
                      {' '}
                      <Dropdown.Item
                        onClick={async () => {
                          //navigate('graph');
                          await storeStepList(
                            userId ?? '',
                            userName ?? '',
                            queryData ?? [],
                          );
                        }}
                      >
                        歩数データ登録
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={async () => {
                          deleteStepList('');
                        }}
                      >
                        歩数データ削除
                      </Dropdown.Item>
                    </>
                  ) : (
                    <></>
                  )}
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>

        <Menu.Item position="right">
          {isSignedIn ? (
            <>
              <Label as="a" basic color="grey">
                {userName}
              </Label>
              <Button
                as="a"
                inverted={!fixed}
                style={{ marginLeft: '0.5em' }}
                onClick={() => getAuth().signOut()}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                as="a"
                inverted={!fixed}
                onClick={() => {
                  navigate('/signin');
                }}
              >
                Log in
              </Button>
              <Button
                as="a"
                inverted={!fixed}
                primary={fixed}
                style={{ marginLeft: '0.5em' }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Menu.Item>
      </Menu>

      <Container text style={{ marginTop: '7em' }}>
        <Header as="h1">歩数アプリ</Header>
        {props.children}
      </Container>

      <Segment
        inverted
        vertical
        style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
      >
        <Container textAlign="center">
          <Grid divided inverted stackable>
            <Grid.Column width={4}>
              <Header inverted as="h4" content="Group 1" />
              <List link inverted>
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
                <List.Item as="a">Link Three</List.Item>
                <List.Item as="a">Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header inverted as="h4" content="Group 2" />
              <List link inverted>
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
                <List.Item as="a">Link Three</List.Item>
                <List.Item as="a">Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header inverted as="h4" content="Footer Header" />
              <p>
                Extra space for a call to action inside the footer that could
                help re-engage users.
              </p>
            </Grid.Column>
          </Grid>

          <Divider inverted section />
          <Image centered size="mini" src="/logo192.png" />
          <List horizontal inverted divided link size="small">
            <List.Item as="a" href="#">
              Site Map
            </List.Item>
            <List.Item as="a" href="#">
              Contact Us
            </List.Item>
            <List.Item as="a" href="#">
              Terms and Conditions
            </List.Item>
            <List.Item as="a" href="#">
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  );
};

export default FixedMenuLayout;
