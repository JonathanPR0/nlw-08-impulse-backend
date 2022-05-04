import { SubmitFeedbackFunction } from "./submitFeedbackFunction"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackFunction(
  {create: createFeedbackSpy},
  {sendMail: sendMailSpy}
);

describe("submit feedback", ()=>{
  it("should be able to submit a feedback", async ()=>{
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "exemple feedback",
      screenshot: "data:image/png;base64",
      
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled;
    expect(sendMailSpy).toHaveBeenCalled;
  })

  it("should not be able to submit feedback without a type", async ()=>{
    await expect(submitFeedback.execute({
      type: "",
      comment: "exemple feedback",
      screenshot: "data:image/png;base64",
      
    })).rejects.toThrow();
  })
  it("should not be able to submit feedback without comment", async ()=>{
    await expect(submitFeedback.execute({
      type: "Bug",
      comment: "",
      screenshot: "data:image/png;base64",
      
    })).rejects.toThrow();
  })
  it("should not be able to submit feedback with an invalid screenshot", async ()=>{
    await expect(submitFeedback.execute({
      type: "Bug",
      comment: "exemple feedback",
      screenshot: "data",
      
    })).rejects.toThrow();
  })
})