// @author Raj Patel

package hirex.videointerview.requests;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class CloseRequest implements Serializable {

    @JsonProperty
    String close;

    @JsonProperty
    boolean value;


    public CloseRequest(String close, boolean value) {
        this.close = close;
        this.value = value;
    }
}