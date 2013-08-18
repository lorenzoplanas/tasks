# encoding: utf-8
require 'sinatra/base'
require 'json'
require_relative './list/member'
require_relative './list/collection'

module Tasker
  class API < Sinatra::Base
    post '/lists' do
      list  = List::Member.new(payload)
      lists = List::Collection.new

      lists.add(list)
      list.persist
      lists.persist
      [201, list.to_json]
    end

    get '/lists/:id' do
      begin
        list = List::Member.new(id: params.fetch('id')).fetch
        [200, list.to_json]
      rescue KeyError => exception
        [404]
      end
    end

    get '/lists' do
      begin
        lists = List::Collection.new
        lists.fetch
        [200, lists.to_json]
      rescue KeyError => exception
        [404]
      end
    end

    put '/lists/:id' do
      begin
        list = List::Member.new(id: params.fetch('id')).fetch
        list.update(payload)
        list.persist
        [200, list.to_json]
      rescue KeyError => exception
        [404]
      end
    end

    delete '/lists/:id' do
      begin
        list  = List::Member.new(id: params.fetch('id'))
        lists = List::Collection.new

        lists.remove(list)
        list.delete
        lists.persist
        [204]
      rescue KeyError => exception
        [404]
      end
    end

    helpers do
      def payload
        @payload ||= JSON.parse(request.body.read.to_s || '')
      end
    end
  end # API
end # Tasker

