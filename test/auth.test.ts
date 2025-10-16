import request from "supertest";


const baseURL = "http://localhost:3000";

// teste de cadastro

describe("POST /api/auth/register", () => {
  it("Cadastrar um novo usuário", async () => {
    const res = await request(baseURL)
      .post("/api/auth/register")
      .send({
        nome: "Administrador",
        email: "adm@tes1.com.br",
        senha: "1",
      });

    console.log(res.status, res.body);

    expect(res.status).toBe(200);
  });
});

// teste de cadastro já existente

describe("POST /api/auth/register", () => {
  it("falha ao tentar cadastrar um usuário que já existe", async () => {
    const res = await request(baseURL)
      .post("/api/auth/register")
      .send({
        nome: "Administrador",
        email: "adm@tes1.com.br",
        senha: "1",
      });

    console.log(res.status, res.body);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Usuário já existe");
  });
});