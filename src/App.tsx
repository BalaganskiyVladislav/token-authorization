import {Component, Vue} from "vue-property-decorator";
import "./assets/css/main.css"
import Header from "@/components/Header";
import MainContainer from "@/components/MainContainer";

@Component
export default class App extends Vue {

  render() {
    return (
        <div id="app">
            <MainContainer>
                <Header />
                <router-view />
            </MainContainer>
        </div>
    )
  }
}
