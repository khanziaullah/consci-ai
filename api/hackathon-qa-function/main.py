import os
from flask import Flask, request, jsonify
from lib import create_chain, get_session_history,create_questions_chain,generate_final_response
from flask_cors import CORS

app = Flask(__name__) 
CORS(app,origins=["*","http://localhost:5173/"],)

#explore http_context object

@app.route('/answer', methods= ['POST','GET'])
def answer():
    user_query = request.get_json()["text"]
    rag_chain = create_chain()
    answer = rag_chain.invoke(
    {"input": user_query},
    config={"configurable": {"session_id": "abc123"}},
    )['answer']
    response = jsonify(answer)
    print(get_session_history("abc123"))
    return response

@app.route('/generateQuestions', methods= ['POST','GET'])
def generateQuestions():
    user_query = request.get_json()["text"]
    generate_questions = create_questions_chain()
    answer = generate_questions.invoke(
    {"input": user_query},
    config={"configurable": {"session_id": "abc123"}},
    )['answer']
    response = jsonify(answer)
    print(get_session_history("abc123"))
    return response


@app.route('/generateFinalResponse', methods= ['POST','GET'])
def generateFinalResponse():
    user_query = request.get_json()["text"]
    generate_questions = generate_final_response()
    answer = generate_questions.invoke(
    {"input": user_query},
    config={"configurable": {"session_id": "abc123"}},
    )['answer']
    response = jsonify(answer)
    print(get_session_history("abc123"))
    return response



if __name__ == "__main__":
    app.run(port=8000, host='0.0.0.0', debug=True)


#use the following command to deploy the cloud run service
#gcloud run deploy qa-function \
#--source . \
#--execution-environment gen2 \
#--service-account <service-account> \
#--set-env-vars INSTANCE_CONNECTION_NAME=$PROJECT_ID:$REGION:$INSTANCE_NAME
#--allow-unauthenticated
