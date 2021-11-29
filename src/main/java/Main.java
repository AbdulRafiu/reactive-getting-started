import io.quarkus.runtime.Quarkus;
import io.quarkus.runtime.QuarkusApplication;
import io.quarkus.runtime.annotations.QuarkusMain;

@QuarkusMain
public class Main {

    public static void main(String[] args) {
        Quarkus.run(args);
    }

    public static class StartupHandler implements QuarkusApplication {

        @Override
        public int run(String... args) throws Exception {
            customStartupHandler(args);
            Quarkus.waitForExit();
            return 0;
        }

        private static void customStartupHandler(String[] params) {
            Quarkus.asyncExit();
        }
    }
}
