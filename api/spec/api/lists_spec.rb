# encoding: utf-8
gem 'minitest'
require 'minitest/autorun'
require 'rack/test'
require_relative '../../api'

def app
  Tasker::API.new
end

describe Tasker::API do
  include Rack::Test::Methods

  before do
    Redis.new.flushdb
  end 

  describe 'POST /lists' do
    it 'creates a list' do
      list = list_factory

      post '/lists', list.to_json
      last_response.status.must_equal 201

      response  = JSON.parse(last_response.body)
      list_id   = response.fetch('id')
      list_name = response.fetch('name')

      list_id   .wont_be_nil
      list_name .must_equal list.fetch(:name)
    end
  end

  describe 'GET /lists' do
    it 'retrieves all lists' do
      2.times { post '/lists', list_factory.to_json }

      get '/lists'
      last_response.status.must_equal 200

      response = JSON.parse(last_response.body)
      response.length.must_equal 2

      response.first.fetch('id').wont_be_nil
      response.first.fetch('name').wont_be_nil
    end
  end

  describe 'GET /lists/:id' do
    it 'retrieves a list' do
      list = list_factory
      post '/lists', list.to_json

      response = JSON.parse(last_response.body)
      
      list_id   = response.fetch('id')
      list_name = response.fetch('name')

      get "/lists/#{list_id}"
      response  = JSON.parse(last_response.body)

      response.fetch('id')    .must_equal list_id
      response.fetch('name')  .must_equal list_name
    end
  end

  describe 'PUT /lists/:id' do
    it 'updates a list' do
      list = list_factory
      post '/lists', list.to_json

      response  = JSON.parse(last_response.body)
      list_id   = response.fetch('id')

      put "/lists/#{list_id}", { name: 'changed' }.to_json
      last_response.status.must_equal 200
      response  = JSON.parse(last_response.body)

      response.fetch('id').must_equal list_id
      response.fetch('name').must_equal 'changed'
    end
  end

  describe 'DELETE /lists/:id' do
    it 'deletes a list' do
      list = list_factory
      post "/lists", list.to_json

      list_id = JSON.parse(last_response.body).fetch('id')
      
      get "/lists/#{list_id}"
      last_response.status.must_equal 200

      delete "/lists/#{list_id}"
      last_response.status.must_equal 204
      last_response.body.must_be_empty

      get "/lists/#{list_id}"
      last_response.status.must_equal 404
    end
  end

  def list_factory
    { name: "Task #{Time.now.to_i + rand(99)}" }
  end
end # Tasker::API

